import React from 'react'
import { useIdleTimer } from 'react-idle-timer'

const SESSION_IDEL_MINUTES = 240;

const AutoLogoutTimer = (props) => {
    const { ComposedClass } = props

    const handleOnIdle = () => {
        console.log('last active', getLastActiveTime())
        localStorage.clear();
        window.location.reload();
    }

    const {getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
        onIdle: handleOnIdle,
        debounce: 500,
    })

    return <ComposedClass />
}

export default AutoLogoutTimer;
