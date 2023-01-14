<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPencil} from '@fortawesome/free-solid-svg-icons';
</script>

<section>
  <table>
    <caption>Constantijn Baarendse</caption>
    <thead>
      <tr>
        <th>Company</th>
        <th>Comms With A Plan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Street</td>
        <td><address>Erich Salomonstraat 507</address></td>
      </tr>
      <tr>
        <td>Zip Code</td>
        <td><address>1087 GT</address></td>
      </tr>
      <tr>
        <td>City</td>
        <td><address>Amsterdam</address></td>
      </tr>
      <tr>
        <td>Phone</td>
        <td><address>0612398734</address></td>
        <td />
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Payment through</td>
        <td>Card</td>
      </tr>
    </tfoot>
  </table>
  <menu><button><Fa icon={faPencil} /></button></menu>
</section>

<style>
  table {
    margin: 2rem auto;
  }
  th,
  td {
    padding: 1em;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--button-size-phone);
    width: var(--button-size-phone);
  }
</style>
