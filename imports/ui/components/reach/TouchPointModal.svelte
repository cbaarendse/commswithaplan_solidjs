<script>
  //packages

  // functions
  import {nameTouchPoint, describeTouchPoint} from '../../../../client/functions';

  import Modal from '../reusable/Modal.svelte';
</script>

<Modal title={display(touchPoint[language].displayName)}>{describe(touchPoint.name)}</Modal>
