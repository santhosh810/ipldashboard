import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamsCards} = props
  const {id, name, teamImageUrl} = teamsCards
  return (
    <Link to={`team-matches/${id}`} className="link-card">
      <div className="card-container">
        <img src={teamImageUrl} alt={name} className="card-log" />
        <p className="card-paragraph">{name}</p>
      </div>
    </Link>
  )
}

export default TeamCard
