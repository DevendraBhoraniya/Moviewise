import React from 'react'
import "./CSS/Error.css"

const Error = () => {
    return (
        <>
            <div className="error mt-64">
                <span className='text-6xl text-center flex items-center justify-center'>404</span>
                <p>You traveled abit to far my friend. I wish you well in your journey and remember,</p>
                <p class="quotething"> “If one dream should fall and break into a thousand pieces, never be afraid to pick one of those pieces up and begin again.”
                    <i>Flavia Weedn</i></p><br />
                <div align="center">
                    <a href="/">
                        <input type="button" class="button404" value="Get Me Outa' Here!" /></a>
                </div>
            </div>
        </>
    )
}

export default Error
