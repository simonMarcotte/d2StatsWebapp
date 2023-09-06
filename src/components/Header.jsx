import React from 'react';

const Header = ({darkMode, setDarkMode}) => {

  const NavButtons = [
    {
      id: 1,
      link: "home"
    },
    {
      id: 2,
      link: "portfolio"
    },
    {
      id: 3,
      link: "experience"
    },
    {
      id: 4,
      link: "contact"
    }
  ];


  return (

    <header className="text-zinc-950 bg-slate-200 rounded-md m-3 sticky top-0 z-50 duration-500">
      <nav className='flex justify-between items-center p-5'>
        <h1 className='text-2xl'>D2 Stats</h1>

        <ul className='md:flex'>
          {NavButtons.map(({id, link}) => (
            <li key={id} className="px-4 cursor-pointer capitalize font-thin hover:scale-110 duration-200">
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
