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

const remove = (state, index) => ({
    ...state,
    items: state.items.filter((_, mapIndex) => (index !== mapIndex))
});

app({
    init: {
        items: [
            {
                name: "Learn Hyperapp",
                completed: true
            },
            {
                name: "Learn Vue",
                completed: false
            },
            {
                name: "This is a really long task meant to show off what multiple lines looks like",
                completed: false
            }
        ]
    },
    view: state => (
        <div>
            <ul>
                {state.items.map((item, index) =>
                    <li class={item.completed ? "completed" : ""}>
                        <span>{item.name}</span>
                        <br />
                        <a class="button complete" onclick={[toggleCompleted, index]}>&#x2714;</a>
                        <a class="button edit">&#x270F;</a>
                        <a class="button remove" onclick={[remove, index]}>&#x2716;</a>
                        <a class="button up">&#x2197;</a>
                        <a class="button down">&#x2198;</a>
                    </li>
                )}
            </ul>
            <p>
                <a class="button remove">&#x2716; Remove All</a>
            </p>
        </div>
    ),
    node: document.getElementById("app")
});