import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from '../utils';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAdminAuth = props => {
    const history = useHistory();
    const { currentUser } = useSelector(mapState);

    useEffect(() => {
        if (!checkUserIsAdmin(currentUser)) {
            history.push('/login');
        }
    }, [currentUser, history]);

    return currentUser;
}

export default useAdminAuth;