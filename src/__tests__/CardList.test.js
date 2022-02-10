import { render, screen, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer'
import CardList from "../CardList/CardList";
import Card from '../CardList/Card'



import { Provider } from 'react-redux';
import store from "../store";

afterEach(()=>{
      cleanup()
})
test('Render CardList component', ()=>{
      render(
            <Provider store={store}>
      <CardList/>
      </Provider>)
      const cardListElement = screen.getByTestId('test-1')
      expect(cardListElement).toBeInTheDocument();
})

test('match snapshot', ()=>{
      const temp = {name:"laboris proident, velit", description:"proident, deserunt dolore cupidatat ullamco"}
      const tree = renderer.create(<Card name={temp.name} description={temp.description}/>).toJSON()
      expect(tree).toMatchSnapshot();
      
})