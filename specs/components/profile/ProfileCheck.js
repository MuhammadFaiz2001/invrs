const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger} = require('../../../conf/base.conf');
var assert = require('assert');


const ProfileGeneralCheck = {
    //avatar, bio, notes, likes, followers, following, interests
    checkAvatar: async function(driver){
        const cardDiv = await driver.wait(until.elementLocated(By.className('card')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(cardDiv), ELEMENT_WAIT_MS);
        const topBarDiv = await cardDiv.findElement(By.className('p-avatar p-component p-avatar-image p-avatar-circle xl'));
        assert(topBarDiv != null);
        logger.debug('Avatar Exists');
    },
    checkBio: async function(driver){
        const bio = await driver.findElement(By.className('bio-text'));
        assert(bio != null);
        logger.debug('Bio Exists');
    },
    checkNotes: async function(driver){
        const notes = await driver.findElement(By.className('num-notes-posted-block'));
        assert(notes != null);
        logger.debug('Notes Exists');
    },
    checkLikes: async function(driver){
        const likes = await driver.findElement(By.className('num-likes-block'));
        assert(likes != null);
        logger.debug('Likes Exists');
    },
    checkFollowers: async function(driver){
        const likes = await driver.findElement(By.className('num-followers-block'));
        assert(likes != null);
        logger.debug('Likes Exists');
    },
    checkFollowing: async function(driver){
        const followers = await driver.findElement(By.className('num-following-block'));
        assert(followers != null);
        logger.debug('Followers Exists');
    },
    checkInterest: async function(driver){
        let found = false;
        try{
            const interests = await driver.findElement(By.id('followedTags'));
            found = assert(interests != null);
        }
        catch(e){
            logger.debug('Interests Do not Exist')
        }
        if(found){
            logger.debug('Interests Exists');
        }
    }

}   

module.exports = { ProfileGeneralCheck };