import Header from './Header'

export default {
  title: 'Messages/Sidebar/Header',
  component: Header,
  parameters: { backgrounds: { default: 'light' } },
}

const Template = (props) => <Header {...props} />

Template.args = {
  user: { name: 'thomas', img: 'https://i.pravatar.cc' },
}
export { Template as Header }
