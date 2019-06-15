import { h, app } from "hyperapp"

// TODO: search
// TODO: autosave to local storage

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
        ]
    },
    view: state => (
        <div>
            <ul>
                {state.items.map(item =>
                    <li>
                        <span>{item.name}</span>
                        <br />
                        <a class="button complete">&#x2714;</a>
                        <a class="button edit">&#x270F;</a>
                        <a class="button delete">&#x2716;</a>
                        <a class="button up">&#x2197;</a>
                        <a class="button down">&#x2198;</a>
                    </li>
                )}
            </ul>
            <p>
                <a class="button delete">&#x2716; Remove All</a>
            </p>
        </div>
    ),
    node: document.getElementById("app")
});