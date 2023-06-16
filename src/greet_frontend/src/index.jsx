import {createActor, greet_backend} from "../../declarations/greet_backend";
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";
import * as React from "react";
import { render } from "react-dom";

let actor = greet_backend;

const meetButton = document.getElementById("meet");
meetButton.onclick = async (e) => {
    e.preventDefault();

    meetButton.setAttribute("disabled", true);

    // Interact with backend actor, calling the greet method
    const meeting = await actor.greet2();

    meetButton.removeAttribute("disabled");

    document.getElementById("greeting").innerText = meeting;

    return false;
};

const greetButton = document.getElementById("greet");
greetButton.onclick = async (e) => {
    e.preventDefault();

    greetButton.setAttribute("disabled", true);

    // Interact with backend actor, calling the greet method
    const greeting = await actor.greet();

    greetButton.removeAttribute("disabled");

    document.getElementById("greeting").innerText = greeting;

    return false;
};

const loginButton = document.getElementById("login");
loginButton.onclick = async (e) => {
    e.preventDefault();

    // create an auth client
    let authClient = await AuthClient.create();

    // start the login process and wait for it to finish
    await new Promise((resolve) => {
        authClient.login({
            identityProvider: process.env.II_URL,
            onSuccess: resolve,
        });
    });

    // At this point we're authenticated, and we can get the identity from the auth client:
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const agent = new HttpAgent({identity});
    // Using the interface description of our webapp, we create an actor that we use to call the service methods.
    actor = createActor(process.env.GREET_BACKEND_CANISTER_ID, {
        agent,
    });

    return false;
};

const MyHello = () => {
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
  
    async function doGreet() {
        //const greeting = await custom_greeting.greet(name);
        const greeting = "testing 123";
      setMessage(greeting);
    }
  
    return (
      <div style={{ "fontSize": "30px" }}>
        <div style={{ "backgroundColor": "yellow" }}>
          <p>Greetings, from DFINITY!</p>
          <p>
            {" "}
            Type your message in the Name input field, then click{" "}
            <b> Get Greeting</b> to display the result.
          </p>
        </div>
        <div style={{ margin: "30px" }}>
          <input
            id="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          ></input>
          <button onClick={doGreet}>Get Greeting!</button>
        </div>
        <div>
          Greeting is: "
          <span style={{ color: "blue" }}>{message}</span>"
        </div>
      </div>
    );
  };
  
  render(<MyHello />, document.getElementById("app"));

