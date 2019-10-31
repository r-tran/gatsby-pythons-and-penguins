import React from "react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Toggle from "react-toggle"
import "./darkModeToggler.css"

const DarkModeToggler= () => {
    return (
        <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <Toggle
              checked={theme === 'dark'}
              className='custom-classname'
              icons={false}
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}/>
          </label> 
        )}
      </ThemeToggler>
    )
}
export default DarkModeToggler