import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    SAVE_PASS_KEY,
    SHOW_LOGIN_ERROR,
    SHOW_REGISTER_ERROR,
    COMPLETE_REGISTRAION,
    CLEAR_PASS_KEY
} from '../../actions/types';
import {
    REGISTER_USER,
    LOG_USER_IN,
    LOG_USER_OUT,
    RE_LOG_USER_IN
} from '../../actions/useraccountcontrolactions';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
let gUser = undefined;

function generateUserName() {
    var text = "";
    var possible = "ABC DEFGH IJKL MNOPQRST U VWXYZabcde fghijklmnopq rstu vwxy z";
    for (var i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

beforeAll(() => {
    gUser = generateUserName();
})

describe('User registration actions', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Shows error when passwords are mismatching', () => {
        store.dispatch(REGISTER_USER('TestUser', 'A', 'B'));
        expect(store.getActions()[0].type).toBe(SHOW_REGISTER_ERROR);
    });
    it('Shows error when no password is given', (done) => {
        store.dispatch(REGISTER_USER(generateUserName())).then(() => {
            expect(store.getActions()[0].type).toBe(SHOW_REGISTER_ERROR);
            done();
        });
    });
    it('Shows success when a valid user registration happened', (done) => {
        store.dispatch(REGISTER_USER(gUser, 'A', 'A')).then(() => {
            expect(store.getActions()[0].type).toBe(COMPLETE_REGISTRAION);
            done();
        });
    });
    it('Shows error when same user registration happened', (done) => {
        store.dispatch(REGISTER_USER(gUser, 'A', 'A')).then(() => {
            expect(store.getActions()[0].type).toBe(SHOW_REGISTER_ERROR);
            done();
        });
    });

});

describe('User login actions', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Tries to login with invalid credentials', (done) => {
        store.dispatch(LOG_USER_IN('TestUser', 'Invalid')).then(res => {
            expect(store.getActions()[0].type).toBe(SHOW_LOGIN_ERROR);
            done();
        });
    });
    it('Tries to login with valid credentials', (done) => {
        store.dispatch(LOG_USER_IN('Padmal', 'a')).then(res => {
            expect(store.getActions()[0].type).toBe(SAVE_PASS_KEY);
            done();
        });
    });
    it('Tries to login with invalid password', (done) => {
        store.dispatch(LOG_USER_IN('Padmal', 'b')).then(res => {
            expect(store.getActions()[0].type).toBe(SHOW_LOGIN_ERROR);
            done();
        });
    });
    it('Tries to login with no username password', (done) => {
        store.dispatch(LOG_USER_IN()).then(res => {
            expect(store.getActions()[0].type).toBe(SHOW_LOGIN_ERROR);
            done();
        });
    });
});

describe('User revisting app actions', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Tries to retrieve cookie and relog user', () => {
        store.dispatch(RE_LOG_USER_IN('cookie'));
        expect(store.getActions()[0].type).toBe(SAVE_PASS_KEY);
    });
});

describe('User logout actions', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Tries to clear passKey when logging out', () => {
        store.dispatch(LOG_USER_OUT());
        expect(store.getActions()[0].type).toBe(CLEAR_PASS_KEY);
    });
});