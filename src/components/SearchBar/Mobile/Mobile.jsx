import React, { useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

const Mobile = ({ searchHandler, error }) => {
    const query = useRef()
    return (
        <form onSubmit={(e) => searchHandler(e, query)} action="#">
            <div className="form-control px-4 mb-5 flex lg:hidden">
                <div className="input-group w-full">
                    <input
                        ref={query}
                        type="text"
                        style={{ borderRadius: '0' }}
                        placeholder="Search…"
                        className={`input input-bordered ${error ? `input-error` : ``} w-full lg:w-96`} />
                    <button style={{ borderRadius: '0' }} className="btn btn-square btn-outline">
                        <FaSearch />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Mobile