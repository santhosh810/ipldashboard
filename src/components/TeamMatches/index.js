import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isTLoading: true}

  componentDidMount() {
    this.getTeamId()
  }

  renderTeamMatchesLoader = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamId = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(`teamId ${id}`)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatch: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    this.setState({teamMatchesData: formattedData, isTLoading: false})
  }

  render() {
    const {teamMatchesData, isTLoading} = this.state
    const {latestMatch} = teamMatchesData
    // const {id} = latestMatch
    // console.log(teamMatchesData)
    // console.log(Object.keys(teamMatchesData))
    console.log(teamMatchesData.latestMatch.id)
    // console.log(teamMatchesData.recentMatch.id)
    return (
      <div>
        {isTLoading ? (
          this.renderTeamMatchesLoader()
        ) : (
          <div className="team-matches-container">
            <div className="team-matches-content-container">
              <img
                className="team-image"
                src={teamMatchesData.teamBannerURL}
                alt="santhosh"
              />
              <h2 className="latest-matches-heading">Latest Matches</h2>
              <LatestMatch latestMatchInfo={latestMatch} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
