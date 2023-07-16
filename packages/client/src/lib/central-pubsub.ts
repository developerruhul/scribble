import { usePageLoadStore } from './stores/misc-store';

/**
 * If any process wants the UI to wait displaying until some
 * task like getting saved auth state is retrieved and updated in the UI is done
 */
class RenderAppUI {
  private waitingProcesses: number[] = [];

  makeRenderWait = () => {
    const index = this.waitingProcesses.push(0);
    return () => {
      // if this function has already been called then return
      if (this.waitingProcesses.length < index) return;
      this.waitingProcesses.splice(index - 1, 1);
      this.render();
    };
  };

  private render = () => {
    if (this.waitingProcesses.length === 0) {
      usePageLoadStore.setState({ pageLoading: false });
    }
  };
}

const centralPubsub = new RenderAppUI();

export default centralPubsub;
