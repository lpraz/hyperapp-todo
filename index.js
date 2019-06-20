import { h, app } from "hyperapp"

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

// Ordinarily these wouldn't be re-implemented, but for the sake of learning...
const localStorageKey = "hyperapp-todo_items";

const readFromLocalStorageEffect = (dispatch, props) => {
    var value = localStorage.getItem(props.key);
    dispatch(props.action, value);
};

const readFromLocalStorage = props => [readFromLocalStorageEffect, props];

const writeToLocalStorageEffect = (dispatch, props) => {
    localStorage.setItem(props.key, props.value);
};

const writeToLocalStorage = props => [writeToLocalStorageEffect, props];

const withSave = (state, newState) => [
    newState,
    writeToLocalStorage({
        key: localStorageKey,
        value: JSON.stringify(newState.items)
    })
];

const initState = () => [
    {
        addingItem: false,
        newItemName: "",
        editingItem: false,
        editingItemName: "",
        removingItem: false,
        filter: ""
    },
    readFromLocalStorage({
        key: localStorageKey,
        action: (state, value) => ({
            ...state,
            items: JSON.parse(value) !== null ? JSON.parse(value) : [
                {
                    name: "Learn Hyperapp",
                    completed: false
                },
                {
                    name: "Conquer the world",
                    completed: false
                },
                {
                    name: "Add some more tasks!",
                    completed: false
                }
            ]
        })
    })
];

const setFilter = (state, filter) => ({
    ...state,
    filter
});

const toggleCompleted = (state, index) => withSave(state, {
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

const moveUp = (state, index) => withSave(state, {
    ...state,
    items: swapArray(state.items, index, index - 1)
});

const moveDown = (state, index) => withSave(state, {
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

const add = state => withSave(state, {
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
    editingItem: false
});

const edit = state => withSave(state, {
    ...state,
    items: state.items.map((item, mapIndex) => (
        state.editingItem === mapIndex ?
        {
            ...item,
            name: state.editingItemName
        } :
        item
    )),
    editingItem: false,
    editingItemName: ""
});

const promptRemove = (state, index) => ({
    ...state,
    removingItem: index
});

const cancelRemove = state => ({
    ...state,
    removingItem: false
});

const remove = state => withSave(state, {
    ...state,
    items: state.items.filter((_, index) => (state.removingItem !== index)),
    removingItem: false
});

const promptRemoveAll = state => ({
    ...state,
    removingItem: "all"
});

const cancelRemoveAll = state => ({
    ...state,
    removingItem: false
});

const removeAll = state => withSave(state, {
    ...state,
    items: [],
    removingItem: false
});

app({
    init: initState(),
    view: state => (
        <div>
            <label>Filter:</label>
            &nbsp;
            <input
                type="text"
                value={state.filter}
                oninput={[setFilter, onInputValue]} />
            <ul>
                {state.items.map((item, index) =>
                    item.name.toLowerCase().includes(state.filter.toLowerCase()) ? (
                        <li class={item.completed ? "completed" : ""}>
                            <span>{item.name}</span>
                            <br />
                            <button
                                class="green"
                                onclick={[toggleCompleted, index]}>
                                &#x2714;
                            </button>
                            <button
                                class="yellow"
                                onclick={[promptEdit, index]}>
                                &#x270F;
                            </button>
                            <button 
                                class="red"
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
                    ) : ""
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
            {state.addingItem !== false ? (
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
            {state.editingItem !== false ? (
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
            {![false, "all"].includes(state.removingItem) ? (
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