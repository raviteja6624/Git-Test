import { LightningElement } from 'lwc';
import marriageInvitationAsset from '@salesforce/resourceUrl/marriageInvitationAsset';
export default class InvitationBanner extends LightningElement {

theme = 'theme1';

instagramImage = marriageInvitationAsset + '/instagram.svg';
facebookImage = marriageInvitationAsset + '/facebook.svg'; 
twitterImage = marriageInvitationAsset + '/twitter.svg';

get bannerImage(){
    let themeName = marriageInvitationAsset + `/${this.theme}.jpeg`
    return `background-image:url(${themeName})`;
}


}