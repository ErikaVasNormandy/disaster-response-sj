import React from 'react'

const postInformationDetails = (informDetails = {}, handler = () => {}, buttonHandler = null) => {
    const {
        updates,
        updateItem,
        title,
        description,
    } = informDetails
    
    const updatesMarkup = updates && updates.length > 0
        ? updates.map(item => {
            return (
                <span className='update-item'>{ item }</span>
            )
        })
        : null

    
    const updatesAddButtonMarkup = buttonHandler ? <button className='add-update-item' onClick={ buttonHandler }>+</button> : null
    const addNotesMarkup = buttonHandler ? (
        <section className='post-updates'>
            <label htmlFor='updateItem'>Notes</label>
            <input onChange={handler} value = { updateItem } type='text' name='updateItem' id='updateItem'/>
            { updatesAddButtonMarkup }
        </section>
        )
        : null
    return (
        <section className='inform-details'>
            <label htmlFor='title'>Title</label>
            <input onChange={handler} value={ title } type='text' name='title' id='title'/>
            <label htmlFor='description'>Description</label>
            <textarea onChange={handler} value={ description } type='text' name='description' id='description'></textarea>
            { addNotesMarkup }
            
            { updatesMarkup }
        </section>
    )
}

export {
    postInformationDetails
}