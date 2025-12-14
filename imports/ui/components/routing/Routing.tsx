// imports
import { Routes, Route } from '@solidjs/router';
import Home from '../home/Home';
import Consultancy from '../consultancy/home/Consultancy';
import Work from '../consultancy/work/Work';
import About from '../consultancy/about/About';
import Contact from '../consultancy/contact/Contact';
import Tools from '../tools/home/Tools';
import Reach from '../tools/reach/Reach';
import Strategies from '../tools/reach/Strategies';
import Docs from '../tools/docs/Docs';
import Legal from '../legal/Legal';
import User from '../user/User';
import LoginSignin from '../user/LoginSignin';
import NotFound from '../notfound/NotFound';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      
      <Route path="/consultancy" component={Consultancy} />
      <Route path="/consultancy/work" component={Work} />
      <Route path="/consultancy/about" component={About} />
      <Route path="/consultancy/contact" component={Contact} />
      
      <Route path="/tools" component={Tools} />
      <Route path="/tools/reach" component={Reach} />
      <Route path="/tools/reach/strategies" component={Strategies} />
      <Route path="/tools/docs" component={Docs} />
      
      <Route path="/legal/*" component={Legal} />
      
      <Route path="/user/loginsignin" component={LoginSignin} />
      <Route path="/user/:username" component={User} />
      
      <Route path="/*" component={NotFound} />
    </Routes>
  );
}
