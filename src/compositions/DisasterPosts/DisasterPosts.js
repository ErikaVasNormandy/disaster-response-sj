import React, { useState } from 'react'

import DisasterPostDetails from '../DisasterPosDetails/DisasterPostDetails'
import DisasterModalPostDetails from '../DisasterModalPostDetails/DisasterModalPostDetails'

import './DisasterPosts.css'

function DisasterPosts(props) {
    const defaultState = {
        showModal: false,
        selectedPost: null,
    }
    const [state, setState] = useState(defaultState)

    const openPostModal = (post) => {
        setState(previousState => {
            return {
                ...previousState,
                showModal: true,
                selectedPost: post,
            }
        })
    }
    
    const postsMockup = (posts, openPostModal) => {
        return posts.
        sort( (a, b) => {
            return a.order > b.order ? 1 : -1
        }).map( (post, index) => {
            return <DisasterPostDetails key={`post-${index}`} post={post} openPostModal={openPostModal} />;
        })
    }

    const dismissModal = (e) => {
        e.preventDefault()
        setState(prevState => {
            return {
                ...prevState,
                showModal: false,
                selectedPost: null,
            }
        })
    }

    const getModalDetails = () => {
        return <DisasterModalPostDetails
                selectedPost={state.selectedPost}
                handleSelectPost={props.handleSelectPost}
                dismissModal={dismissModal} />
    }


    const modalDetails = state.showModal ? getModalDetails() : null
    const backdrop = state.showModal ? <div className='backdrop' onClick={ dismissModal }></div> : null
    const posts = postsMockup(props.posts, openPostModal)
    return (
        <div className='DisasterPosts'>
            { backdrop }
            { modalDetails }
            <section className='posts-list-container'>
                { posts }
            </section>
        </div>
    );
    
}

export default DisasterPosts
