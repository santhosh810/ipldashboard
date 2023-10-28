import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'
import './index.css'

// const initialTeamsCardsList = [
//   {
//     id: 'RCB',
//     name: 'Royal Challengers Bangalore',
//     teamImageUrl: 'https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png',
//   },
//   {
//     id: 'KKR',
//     name: 'Kolkata Knight Riders',
//     teamImageUrl: 'https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png',
//   },
// ]

class Home extends Component {
  state = {teamsCardsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsCards()
  }

  renderLoader = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  getTeamsCards = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    // console.log(data)

    const updateData = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))

    this.setState({teamsCardsList: updateData, isLoading: false})
  }

  render() {
    const {teamsCardsList, isLoading} = this.state

    // const {name, teamImageUrl} = this.state
    // console.log(name)
    // console.log(teamImageUrl)

    return (
      <div className="home-container">
        <div className="content-container">
          <div className="logo-container">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="logo-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            this.renderLoader()
          ) : (
            <div className="card">
              {teamsCardsList.map(team => (
                <TeamCard teamsCards={team} key={team.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
