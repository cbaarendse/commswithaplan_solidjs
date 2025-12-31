import {createSignal, createMemo, For, Show} from 'solid-js';
import {Meteor} from 'meteor/meteor';
import {CWAPUser} from '../../../both/typings/types';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';

export default function User() {
  const [subReady, setSubReady] = createSignal(false);
  const [currentUser, setCurrentUser] = createSignal<CWAPUser | null>(null);

  // Subscribe to user data
  const userSubscription = Meteor.subscribe('userData');
  setSubReady(userSubscription.ready());
  setCurrentUser(Meteor.user() as CWAPUser);

  // Functions
  const showValue = (value: string | number | undefined | null) => {
    return value ? value : '--';
  };

  return (
    <section>
      <div class="container">
        <menu>
          <button><Fa icon={faPencil} /></button>
        </menu>
        <table>
          <caption>
            <Show when={currentUser()?.profile}>
              {currentUser()?.profile.firstname}&nbsp;{currentUser()?.profile.surname}
            </Show>
          </caption>
          <thead>
            <tr>
              <th>Company</th>
              <th>{currentUser()?.profile?.companyId}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td><address>{currentUser()?.username}</address></td>
            </tr>
            <Show when={currentUser()?.emails}>
              <For each={currentUser()?.emails}>
                {(email, index) => (
                  <tr>
                    <td>Email {index() + 1}</td>
                    <td>
                      <address>{email.address}</address>
                    </td>
                  </tr>
                )}
              </For>
            </Show>
            <tr>
              <td>Street</td>
              <td><address>{showValue(currentUser()?.profile?.street)}</address></td>
            </tr>
            <tr>
              <td>Zip Code</td>
              <td><address>{showValue(currentUser()?.profile?.zipcode)}</address></td>
            </tr>
            <tr>
              <td>City</td>
              <td><address>{showValue(currentUser()?.profile?.city)}</address></td>
            </tr>
            <tr>
              <td>Phone</td>
              <td><address>{showValue(currentUser()?.profile?.phone)}</address></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Payment through</td>
              <td>{showValue(currentUser()?.profile?.stripeId)}</td>
            </tr>
          </tfoot>
        </table>
        <style>{`
  div.container {
    width: min(100% - 1em, 60ch);
    margin: 0 auto;
  }
  table {
    margin: 2rem auto;
    width: 100%;
  }
  table,
  caption,
  th,
  td {
    padding: 1em;
    background: var(--ra-white);
    border: 0.8rem solid var(--ra-grey-off-white);
    border-collapse: collapse;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    height: var(--button-size-phone);
    width: var(--button-size-phone);
  }
  menu {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
    background: var(--ra-white);
  }
        `}</style>
      </div>
    </section>
  );
}
