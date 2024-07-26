
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignIn from '../auth/SignIn';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [signInOpen, setSignInOpen] = React.useState(false);
  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  return (
    <div className="flex items-center justify-between p-4 w-full md:w-3/4 mx-auto">
      <div className="flex items-center space-x-4">
        <button onClick={toggleDrawer(true)} className="text-black">
          <MenuIcon />
        </button>
        <span className="text-xl font-bold text-black">ThriftAll Around</span>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          className="flex items-center"
          onClick={handleSignInOpen}
        >
          <AccountCircleIcon className="text-black" />
          <span className="ml-1 text-black">Sign In</span>
        </button>
        <button className="flex items-center hidden md:flex">
          <SearchIcon className="text-black" />
          <span className="ml-1 text-black">Search</span>
        </button>
      </div>

      {/* Sidebar Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50" onClick={toggleDrawer(false)}>
          <div className="fixed top-0 left-0 w-1/2 h-full bg-white shadow-lg p-4" onClick={e => e.stopPropagation()}>
            <button onClick={toggleDrawer(false)} className="text-black">Close</button>
            <div>
              <ul>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <li key={text} className="flex items-center p-2 hover:bg-gray-200">
                    <span className="mr-2">
                    
                      {index % 2 === 0 ? '📥' : '📧'}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <hr className="my-2" />
              <ul>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <li key={text} className="flex items-center p-2 hover:bg-gray-200">
                    <span className="mr-2">
                     
                      {index % 2 === 0 ? '📥' : '📧'}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

  
      <SignIn open={signInOpen} onClose={handleSignInClose} />
    </div>
  );
};

export default NavBar;
