import React from 'react';

const Footer = (props) => {
    const footer = {
        background: '#111'
    }
    const css = {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 0,
        paddingTop: 100,
        paddingBottom: 100
    }
    return(
        <div className="footer" style={footer}>
            <p className="lead" style={css}>Website powered by React and Create by Me!</p>
        </div>
    )
}

export default Footer;