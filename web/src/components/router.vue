<script>
import Login from "@/components/login";
import Draft from "@/components/draft";
import {h} from "vue";
export default {
  name: "router",
  components: {
    Draft,
    Login
  },
  data(){
    return ({
      currentComponent: Login
    });
  },
  methods: {
    handler(args) {
      console.log(args);
      if (args.event  === 'login') {
        this.currentComponent = Draft;
      } else if (args.event === 'logout') {
        this.currentComponent = Login;
      }
      console.log(this.currentComponent);
    }
  },
  render() {
    console.log('render');
    const comp = this.currentComponent;
    return h(comp, {
      onEmit: (args) => {
        this.handler(args);
      }
    });
  }
}
</script>

<style scoped>

</style>
