import { h, app } from "hyperapp"

// TODO: confirm remove
// TODO: search
// TODO: autosave to local storage

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
    promptRemoveFor: index
});

const cancelRemove = state => ({
    ...state,
    promptRemoveFor: null
});

const remove = (state, index) => ({
    ...state,
    items: state.items.filter((_, mapIndex) => (index !== mapIndex)),
    promptRemoveFor: null
});

const promptRemoveAll = state => ({
    ...state,
    promptRemoveFor: "all"
});

const cancelRemoveAll = state => ({
    ...state,
    promptRemoveFor: null
});

const removeAll = state => ({
    ...state,
    items: [],
    promptRemoveFor: null
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
                name: "This is a really long task meant to show off what multiple lines looks like",
                completed: false
            }
        ],
        promptRemoveFor: null
    },
    view: state => (
        <div>
            <ul>
                {state.items.map((item, index) =>
                    <li class={item.completed ? "completed" : ""}>
                        <span>{item.name}</span>
                        <br />
                        <a class="button complete" onclick={[toggleCompleted, index]}>
                            &#x2714;
                        </a>
                        <a class="button edit">&#x270F;</a>
                        <a class="button remove" onclick={[promptRemove, index]}>
                            &#x2716;
                        </a>
                        <a class="button">&#x2197;</a>
                        <a class="button">&#x2198;</a>
                    </li>
                )}
            </ul>
            <p>
                {state.items.length ? (
                    <a
                        class="button remove"
                        onclick={promptRemoveAll}>
                        &#x2716; Remove All
                    </a>
                ) : ""}
            </p>
            {![null, "all"].includes(state.promptRemoveFor) ? (
                <div class="modal">
                    <p>
                        Are you sure you want to remove the task
                        "{state.items[state.promptRemoveFor].name}"?
                    </p>
                    <a class="button" onclick={cancelRemove}>Cancel</a>
                    <a
                        class="button remove"
                        onclick={[remove, state.promptRemoveFor]}>
                        &#x2716; Remove
                    </a>
                </div>
            ) : ""}
            {state.promptRemoveFor === "all" ? (
                <div class="modal">
                    <p>Are you sure you want to remove all tasks from the list?</p>
                    <a class="button" onclick={cancelRemoveAll}>Cancel</a>
                    <a class="button remove" onclick={[removeAll]}>&#x2716; Remove All</a>
                </div>
            ) : ""}
        </div>
    ),
    node: document.getElementById("app")
});