import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer(){
    return(
        <div className = "footer">
            <a href = "https://github.com/Valerie3956/assignments/tree/main/level-4/capstone" >
            <FontAwesomeIcon icon={faGithub} />
        </a>
        </div>
    )
}