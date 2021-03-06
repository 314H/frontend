import {Component} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle'
import Container, {Icon, Notifications} from './styles'
import Link from 'next/link'
import {headerMobileMedia} from 'constants/media'

export default class UserMenu extends Component {
  state = {
    opened: false
  }

  containerRef = (node) => {
    this.container = node
  }

  isMobile = () => window.matchMedia(headerMobileMedia).matches

  componentDidMount() {
    this.setState({opened: this.isMobile()})
    window.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClick)
  }

  handleMenu = () => {
    const {opened} = this.state
    this.setState({opened: !opened})
  }

  handleClick = (e) => {
    if (!this.state.opened || this.container.contains(e.target)) return
    this.setState({opened: this.isMobile()})
    e.stopPropagation()
  }

  render() {
    const {items, notifications} = this.props
    const {opened} = this.state
    return (
      <Container
        innerRef={this.containerRef}
        opened={opened}
        onClick={this.handleMenu}
      >
        <Icon>
          <Notifications notifications={notifications}>
            <span>{notifications}</span>
          </Notifications>
          <FontAwesomeIcon icon={faUser} />
        </Icon>

        <ul>
          {items.map(({title, href, as}) => (
            <li key={title}>
              <Link href={href} as={as}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    )
  }
}
