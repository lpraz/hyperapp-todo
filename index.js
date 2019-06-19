import { h, app } from "hyperapp"

// TODO: search/filter
// TODO: autosave to local storage

const swapArray = (array, x, y) =>
    array.map((_, index) => {
        switch (index) {
            case x: return array[y];
            case y: return array[x];
            default: return array[index];
        }
    });

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

const moveUp = (state, index) => ({
    ...state,
    items: swapArray(state.items, index, index - 1)
});

const moveDown = (state, index) => ({
    ...state,
    items: swapArray(state.items, index, index + 1)
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

const add = state => ({
    ...state,
    items: [
        ...state.items,
        {
            name: state.newItemName,
            completed: false
        }
    ],
    addingItem: false,
    newItemName: ""
});

const promptEdit = (state, index) => ({
    ...state,
    editingItem: index,
    editingItemName: state.items[index].name
});

const setEditingItemName = (state, name) => ({
    ...state,
    editingItemName: name
});

const cancelEdit = state => ({
    ...state,
    editingItem: null
});

const edit = state => ({
    ...state,
    items: state.items.map((item, mapIndex) => (
        state.editingItem === mapIndex ?
        {
            ...item,
            name: state.editingItemName
        } :
        item
    )),
    editingItem: null,
    editingItemName: ""
});

const promptRemove = (state, index) => ({
    ...state,
    removingItem: index
});

const cancelRemove = state => ({
    ...state,
    removingItem: null
});

const remove = state => ({
    ...state,
    items: state.items.filter((_, index) => (state.removingItem !== index)),
    removingItem: null
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
        addingItem: false,
        newItemName: "",
        editingItem: false,
        editingItemName: "",
        removingItem: null
    },
    view: state => (
        <div>
            <ul>
                {state.items.map((item, index) =>
                    <li class={item.completed ? "completed" : ""}>
                        <span>{item.name}</span>
                        <br />
                        <button
                            class="button green"
                            onclick={[toggleCompleted, index]}>
                            &#x2714;
                        </button>
                        <button
                            class="button yellow"
                            onclick={[promptEdit, index]}>
                            &#x270F;
                        </button>
                        <button 
                            class="button red"
                            onclick={[promptRemove, index]}>
                            &#x2716;
                        </button>
                        <button
                            disabled={index === 0}
                            onclick={[moveUp, index]}>
                            &#x2197;
                        </button>
                        <button
                            disabled={index === state.items.length - 1}
                            onclick={[moveDown, index]}>
                            &#x2198;
                        </button>
                    </li>
                )}
            </ul>
            <p>
                <button class="blue" onclick={promptAdd}>
                    + Add
                </button>
                {state.items.length ? (
                    <button
                        class="red"
                        onclick={promptRemoveAll}>
                        &#x2716; Remove All
                    </button>
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
                    <button onclick={cancelAdd}>&#x21A9; Cancel</button>
                    <button class="blue" onclick={add}>
                        + Add
                    </button>
                </div>
            ) : ""}
            {state.editingItem ? (
                <div class="modal">
                    <p>Enter a new name for the task:</p>
                    <input
                        type="text"
                        value={state.editingItemName}
                        onInput={[setEditingItemName, onInputValue]} />
                    <br />
                    <button onclick={cancelEdit}>&#x21A9; Cancel</button>
                    <button class="yellow" onclick={[edit]}>
                        &#x270F; Edit
                    </button>
                </div>
            ) : ""}
            {![null, "all"].includes(state.removingItem) ? (
                <div class="modal">
                    <p>
                        Are you sure you want to remove the task
                        "{state.items[state.removingItem].name}"?
                    </p>
                    <button onclick={cancelRemove}>
                        &#x21A9; Cancel
                    </button>
                    <button class="red" onclick={remove}>
                        &#x2716; Remove
                    </button>
                </div>
            ) : ""}
            {state.removingItem === "all" ? (
                <div class="modal">
                    <p>
                        Are you sure you want to remove all tasks from the
                        list?
                    </p>
                    <button onclick={cancelRemoveAll}>
                        &#x21A9; Cancel
                    </button>
                    <button class="red" onclick={[removeAll]}>
                        &#x2716; Remove All
                    </button>
                </div>
            ) : ""}
        </div>
    ),
    node: document.getElementById("app")
});