import { h, app } from "hyperapp"

// TODO: search/filter
// TODO: autosave to local storage

const onInputValue = event =>
    event.target.value;

const toggleCompleted = (state, index) => ({
    ...state,
    items: state.items.map((item, mapIndex) => (
        index === mapIndex ?
        {
            ...item,
            completed: !item.completed
        } :
        item
    ))
});

const promptRemove = (state, index) => ({
    ...state,
    removingItem: index
});

const cancelRemove = state => ({
    ...state,
    removingItem: null
});

const remove = (state, index) => ({
    ...state,
    items: state.items.filter((_, mapIndex) => (index !== mapIndex)),
    removingItem: null
});

const promptAdd = state => ({
    ...state,
    addingItem: true
});

const setNewItemName = (state, name) => ({
    ...state,
    newItemName: name
});

const cancelAdd = state => ({
    ...state,
    addingItem: false,
    newItemName: ""
});

const add = (state, newItemName) => ({
    ...state,
    items: [
        ...state.items,
        {
            name: newItemName,
            completed: false
        }
    ],
    addingItem: false,
    newItemName: ""
});

const promptRemoveAll = state => ({
    ...state,
    removingItem: "all"
});

const cancelRemoveAll = state => ({
    ...state,
    removingItem: null
});

const removeAll = state => ({
    ...state,
    items: [],
    removingItem: null
});

app({
    init: {
        items: [
            {
                name: "Learn Hyperapp",
                completed: false
            },
            {
                name: "Learn Vue",
                completed: false
            },
            {
                name: "This is a really long task meant to show off what " +
                    "having multiple lines looks like",
                completed: false
            }
        ],
        removingItem: null,
        addingItem: false,
        newItemName: null
    },
    view: state => (
        <div>
            <ul>
                {state.items.map((item, index) =>
                    <li class={item.completed ? "completed" : ""}>
                        <span>{item.name}</span>
                        <br />
                        <a
                            class="button green"
                            onclick={[toggleCompleted, index]}>
                            &#x2714;
                        </a>
                        <a class="button yellow">&#x270F;</a>
                        <a class="button red" onclick={[promptRemove, index]}>
                            &#x2716;
                        </a>
                        <a class="button">&#x2197;</a>
                        <a class="button">&#x2198;</a>
                    </li>
                )}
            </ul>
            <p>
                <a
                    class="button blue"
                    onclick={promptAdd}>
                    + Add
                </a>
                {state.items.length ? (
                    <a
                        class="button red"
                        onclick={promptRemoveAll}>
                        &#x2716; Remove All
                    </a>
                ) : ""}
            </p>
            {state.addingItem ? (
                <div class="modal">
                    <p>Enter a name for the task:</p>
                    <input
                        type="text"
                        value={state.newItemName}
                        onInput={[setNewItemName, onInputValue]} />
                    <br />
                    <a class="button" onclick={cancelAdd}>&#x21A9; Cancel</a>
                    <a
                        class="button blue"
                        onclick={[add, state.newItemName]}>
                        + Add
                    </a>
                </div>
            ): ""}
            {![null, "all"].includes(state.removingItem) ? (
                <div class="modal">
                    <p>
                        Are you sure you want to remove the task
                        "{state.items[state.removingItem].name}"?
                    </p>
                    <a class="button" onclick={cancelRemove}>
                        &#x21A9; Cancel
                    </a>
                    <a
                        class="button red"
                        onclick={[remove, state.removingItem]}>
                        &#x2716; Remove
                    </a>
                </div>
            ) : ""}
            {state.removingItem === "all" ? (
                <div class="modal">
                    <p>
                        Are you sure you want to remove all tasks from the
                        list?
                    </p>
                    <a class="button" onclick={cancelRemoveAll}>
                        &#x21A9; Cancel
                    </a>
                    <a class="button red" onclick={[removeAll]}>
                        &#x2716; Remove All
                    </a>
                </div>
            ) : ""}
        </div>
    ),
    node: document.getElementById("app")
});