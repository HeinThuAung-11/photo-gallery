import React, { useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

const Desktop = ({ searchHandler, error }) => {
    const query = useRef()
    return (
        <div className="form-control hidden lg:flex">
            <div className="input-group w-full">
                <form onSubmit={(e) => searchHandler(e, query)} action="#">
                    <input
                        ref={query}
                        type="text"
                        style={{ borderRadius: '0' }}
                        placeholder="Search…"
                        className={`input input-bordered ${error ? `input-error` : ``} w-full lg:w-96`} />
                    <button type='submit' style={{ borderRadius: '0' }} className="btn btn-square btn-outline">
                        <FaSearch />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Desktop