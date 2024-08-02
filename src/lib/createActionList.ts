import { createEffect, createMemo } from 'solid-js';
import Fuse from 'fuse.js';
import { useStore } from './StoreContext';
import { checkActionAllowed, getActiveParentAction } from './actionUtils/actionUtils';
import { WrappedAction } from './types';

export function createActionList() {
  const [state] = useStore();

  return createMemo(() => {
    return Object.values(state.actions);
  });
}

export function createNestedActionList() {
  const actionsList = createActionList();
  const [state] = useStore();

  function nestedActionFilter(action: WrappedAction) {
    const { activeId, isRoot } = getActiveParentAction(state.activeParentActionIdList);

    return isRoot || action.parentActionId === activeId;
  }

  return createMemo(() => {
    return actionsList().filter(nestedActionFilter);
  });
}

export function createConditionalActionList() {
  const [state] = useStore();
  const nestedActionsList = createNestedActionList();

  function conditionalActionFilter(action: WrappedAction) {
    return checkActionAllowed(action, state.actionsContext);
  }

  return createMemo(() => {
    return nestedActionsList().filter(conditionalActionFilter);
  });
}

export function createSearchResultList() {
  const [state] = useStore();
  const conditionalActionList = createConditionalActionList();

  const fuse = new Fuse(conditionalActionList(), {
    keys: [
      {
        name: 'title',
        weight: 1,
      },
      {
        name: 'subtitle',
        weight: 0.7,
      },
      {
        name: 'keywords',
        weight: 0.5,
      },
    ],
  });

  const resultsList = createMemo(() => {
    if (state.searchText.length === 0) {
      return conditionalActionList();
    }

    const searchResults = fuse.search(state.searchText);

    return searchResults.map((result) => result.item);
  });

  createEffect(() => {
    fuse.setCollection(conditionalActionList());
  });

  return resultsList;
}
