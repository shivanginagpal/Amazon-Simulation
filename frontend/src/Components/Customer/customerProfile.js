import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomerProfile } from '../../actions/profileAction';

class customerProfile extends Component {
    componentDidMount() {
        if(this.props.auth){
           this.props.getCustomerProfile();
        }
    }

    render() {
        const { profile=[], loading } = this.props.profile;
    
        console.log(this.props);
        if (profile === null || loading ) {
            console.log("No profile");
             
          } else {
        console.log("Profile:",profile);
          }
        return (
            <div>
                <Navbar/>
                <div class="a-container">
                <div class="a-section auth-pagelet-desktop-wide-container">
                <div class="a-section auth-pagelet-desktop-wide-container">
                        <h1 id="ap_cnep_header" class="a-spacing-small">
                            Login &amp; security
                        </h1>
                        </div>
            </div>
            </div>
                
            </div>
        )
    }
}

customerProfile.propTypes = {
    getCustomerProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getCustomerProfile })(customerProfile);

{/* <div class="a-section">
  <div class="a-box a-vertical"><div class="a-box-inner a-padding-none"><ul class="a-unordered-list a-nostyle a-box-list">
    <li><span class="a-list-item">
      


<!-- Set in request scope so that this variable is available to to CNEPMenuItem.jsp -->

<div class="a-section a-padding-medium">
  <form id="cnep_1a_name_form" method="get" action="">

  
    
    
      <input type="hidden" name="appActionToken" value="7p6nYH2pd7KgKSTlngp1NuLBolQj3D"><input type="hidden" name="appAction" value="CNEP_NAME">

  
    <input type="hidden" name="openid.return_to" value="ape:aHR0cHM6Ly93d3cuYW1hem9uLmNvbS95b3VyLWFjY291bnQ=">
  
    <input type="hidden" name="prevRID" value="ape:QVhXWjgyNU1CUEs1OTJOMUo5VFQ=">
  
    <input type="hidden" name="email" value="ape:c2hpdmFuZ2kubmFncGFsQHNqc3UuZWR1">
  
    <input type="hidden" name="workflowState" value="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.ovyQEDaFwsnOYLwjmzQxMtXPa9hxjn7BEE6OQjniwbaGfT7jZVm93g.sA6p5nlrHniAQhAM.2XfikDYHkqmp8WNIAtwqc-AilvpK_H8eInKFkwDgNspG1uvVkLdEOb3dilglhGk0p3qugD1xEh2z8Ov_qvf3nSu2lRW7ICzlHSeoNjjZLby4rx0XvAM_XnfmDNOJwhHw7X0bLClKkUxxWx5Pw5GDSVaPvajn5RsKeZuHSlaqj1w65DrH1qa8SuLJtCTs67ppbTrawxFVcNFIG4rmsHbCW1C7PhvObUHLNQm_TK5Xxgh78eNMdBhhZJpiygtyLbNYn2p6uX9yuuYOuoZ2BDla3PBH4UEo41XYF5fe5sksAlkXn-CiOuBNORwoUfkTUOsrKFOjEWTZMb2sx1AyQQBOi17vHZ0DGRogj_Hkht1BZe5lIEUIdpFMPyKhNX6PgZLPh6kRQeyJTyEu5ZaDegBurz5Jt_4Gda4yuVYNQYD95Z5JJqsvBQy7wGZs9KIioV354jU91393TJqGoKto6t_PvuJuUEI6ICqYd0H7VzN-Tixw9EDlrEZ6A99JV7lfIy9ombQaNP6CHiaw95C76_xsPYj8zvE0Fm5-AJcoUu_l65WOk7BR-oGKl2a9rjU-k0y8OBjBJE1hQ31z7pfwoeXsMBRgoGZI4D_QnsC_6QUHaL7Mx1344rB7rL17Fs_8_WxN1-Po.kAVeGWlW15mpBvifD1cTqg">
  
    <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:70px">
      <div class="a-fixed-right-grid-col a-col-left" style="padding-right:5%;float:left;">
        <div class="a-row">
          <span class="a-text-bold">
            Name:
          </span>
        </div>
        
          <div class="a-row">
            Shivangi Nagpal
          </div>
        
        

        

        
      </div>

      
        <div class="a-fixed-right-grid-col a-col-right" style="width:70px;margin-right:-70px;float:left;">
          <div class="a-row">
            <span class="a-button a-button-span12 a-button-base" id="a-autoid-0"><span class="a-button-inner"><input id="auth-cnep-edit-name-button" class="a-button-input" type="submit" aria-labelledby="a-autoid-0-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-0-announce">
              Edit
            </span></span></span>
          </div>
          
        </div>
      
    </div></div>
  </form>
</div>



    </span></li>
    
    
    
    
      
        <li><span class="a-list-item">
          
          















<div class="a-section a-padding-medium">
  <form id="cnep_1a_email_form" method="get" action="/ap/cvf/request">

  
    
      <input type="hidden" name="arb" value="ddd5d6c9-d941-4779-9985-e4645b29571c">
      <input type="hidden" name="openid.assoc_handle" value="usflex">
      <input type="hidden" name="clientContext" value="135-1632846-3215506">
    

    <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:70px">
      <div class="a-fixed-right-grid-col a-col-left" style="padding-right:5%;float:left;">
        <div class="a-row">
          <span class="a-text-bold">
            Email:
          </span>
        </div>
        
          <div class="a-row">
            shivangi.nagpal@sjsu.edu
          </div>
        
        

        

        
      </div>

      
        <div class="a-fixed-right-grid-col a-col-right" style="width:70px;margin-right:-70px;float:left;">
          <div class="a-row">
            <span class="a-button a-button-span12 a-button-base" id="a-autoid-1"><span class="a-button-inner"><input id="auth-cnep-edit-email-button" class="a-button-input" type="submit" aria-labelledby="a-autoid-1-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-1-announce">
              Edit
            </span></span></span>
          </div>
          
        </div>
      
    </div></div>
  </form>
</div>

        </span></li>
      
    
    
    
    
      
      
      
      
        
        
          
          
            <li><span class="a-list-item">

<div class="a-section a-padding-medium">
  <form id="cnep_1a_mobile_phone_form" method="get" action="https://www.amazon.com/ap/profile/mobilephone">

  
    
    
      <input type="hidden" name="appActionToken" value="fnI6S3IZp9BqbHUtJAALVa85csIj3D"><input type="hidden" name="appAction" value="CHANGE_MOBILE_PHONE">

      




  
    <input type="hidden" name="openid.return_to" value="ape:aHR0cHM6Ly93d3cuYW1hem9uLmNvbS95b3VyLWFjY291bnQ=">
  
    <input type="hidden" name="prevRID" value="ape:QVhXWjgyNU1CUEs1OTJOMUo5VFQ=">
  
    <input type="hidden" name="email" value="ape:c2hpdmFuZ2kubmFncGFsQHNqc3UuZWR1">
  
    <input type="hidden" name="workflowState" value="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.ovyQEDaFwsnOYLwjmzQxMtXPa9hxjn7BEE6OQjniwbaGfT7jZVm93g.sA6p5nlrHniAQhAM.2XfikDYHkqmp8WNIAtwqc-AilvpK_H8eInKFkwDgNspG1uvVkLdEOb3dilglhGk0p3qugD1xEh2z8Ov_qvf3nSu2lRW7ICzlHSeoNjjZLby4rx0XvAM_XnfmDNOJwhHw7X0bLClKkUxxWx5Pw5GDSVaPvajn5RsKeZuHSlaqj1w65DrH1qa8SuLJtCTs67ppbTrawxFVcNFIG4rmsHbCW1C7PhvObUHLNQm_TK5Xxgh78eNMdBhhZJpiygtyLbNYn2p6uX9yuuYOuoZ2BDla3PBH4UEo41XYF5fe5sksAlkXn-CiOuBNORwoUfkTUOsrKFOjEWTZMb2sx1AyQQBOi17vHZ0DGRogj_Hkht1BZe5lIEUIdpFMPyKhNX6PgZLPh6kRQeyJTyEu5ZaDegBurz5Jt_4Gda4yuVYNQYD95Z5JJqsvBQy7wGZs9KIioV354jU91393TJqGoKto6t_PvuJuUEI6ICqYd0H7VzN-Tixw9EDlrEZ6A99JV7lfIy9ombQaNP6CHiaw95C76_xsPYj8zvE0Fm5-AJcoUu_l65WOk7BR-oGKl2a9rjU-k0y8OBjBJE1hQ31z7pfwoeXsMBRgoGZI4D_QnsC_6QUHaL7Mx1344rB7rL17Fs_8_WxN1-Po.kAVeGWlW15mpBvifD1cTqg">
  



      
        <input type="hidden" name="referringAppAction" value="CNEP">
      
    
  

    

    
      
      
      
      
      
      
      
      
        
      
    

    <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:70px">
      <div class="a-fixed-right-grid-col a-col-left" style="padding-right:5%;float:left;">
        <div class="a-row">
          <span class="a-text-bold">
            Mobile Phone Number:
          </span>
        </div>
        
        

        

        
          <div class="a-row">
            <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;max-width&quot;:&quot;300px&quot;,&quot;width&quot;:&quot;95%&quot;,&quot;name&quot;:&quot;phoneModal&quot;,&quot;header&quot;:&quot;Why add a mobile number?&quot;}">
              <a id="phoneModalLink" class="a-link-normal" href="javascript:void(0)">
                Why add a mobile number?
              </a>
            </span>
            





<div class="a-popover-preload" id="a-popover-phoneModal">
  <div class="a-row">
    <p id="phoneModalContent">
      A mobile phone number can be used to Sign-In to Amazon and reset your password if you forget it.
    </p>
  </div>

  <div class="a-divider a-divider-section a-spacing-top-extra-large"><div class="a-divider-inner"></div></div>

  <div class="a-section">
    
      
      
      
        
        
      
    
    
    <div class="a-row">
      <div class="a-column a-span2 a-push5">
        <span class="a-declarative" data-action="a-popover-close" data-a-popover-close="{}">
          <span class="a-button a-button-primary" id="a-autoid-2"><span class="a-button-inner"><input class="a-button-input" type="submit" aria-labelledby="a-autoid-2-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-2-announce">
            OK
          </span></span></span>
        </span>
      </div>
    </div>
  </div>

</div>

          </div>
        
      </div>

      
        <div class="a-fixed-right-grid-col a-col-right" style="width:70px;margin-right:-70px;float:left;">
          <div class="a-row">
            <span class="a-button a-button-span12 a-button-base" id="a-autoid-3"><span class="a-button-inner"><input id="auth-cnep-add-phone-button" class="a-button-input" type="submit" aria-labelledby="a-autoid-3-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-3-announce">
              Add
            </span></span></span>
          </div>
          
        </div>
      
    </div></div>
  </form>
</div>

            </span></li>
          
          
          
        
      
    
    
    
    
    
    
    
      
        <li><span class="a-list-item">
          

















<div class="a-section a-padding-medium">
  <form id="cnep_1a_password_form" method="get" action="">

  
    
    
      <input type="hidden" name="appActionToken" value="6vj2BFdTLMcxdDlwKZoScKg5R0APAj3D"><input type="hidden" name="appAction" value="CNEP_PWD">

      




  
    <input type="hidden" name="openid.return_to" value="ape:aHR0cHM6Ly93d3cuYW1hem9uLmNvbS95b3VyLWFjY291bnQ=">
  
    <input type="hidden" name="prevRID" value="ape:QVhXWjgyNU1CUEs1OTJOMUo5VFQ=">
  
    <input type="hidden" name="email" value="ape:c2hpdmFuZ2kubmFncGFsQHNqc3UuZWR1">
  
    <input type="hidden" name="workflowState" value="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.ovyQEDaFwsnOYLwjmzQxMtXPa9hxjn7BEE6OQjniwbaGfT7jZVm93g.sA6p5nlrHniAQhAM.2XfikDYHkqmp8WNIAtwqc-AilvpK_H8eInKFkwDgNspG1uvVkLdEOb3dilglhGk0p3qugD1xEh2z8Ov_qvf3nSu2lRW7ICzlHSeoNjjZLby4rx0XvAM_XnfmDNOJwhHw7X0bLClKkUxxWx5Pw5GDSVaPvajn5RsKeZuHSlaqj1w65DrH1qa8SuLJtCTs67ppbTrawxFVcNFIG4rmsHbCW1C7PhvObUHLNQm_TK5Xxgh78eNMdBhhZJpiygtyLbNYn2p6uX9yuuYOuoZ2BDla3PBH4UEo41XYF5fe5sksAlkXn-CiOuBNORwoUfkTUOsrKFOjEWTZMb2sx1AyQQBOi17vHZ0DGRogj_Hkht1BZe5lIEUIdpFMPyKhNX6PgZLPh6kRQeyJTyEu5ZaDegBurz5Jt_4Gda4yuVYNQYD95Z5JJqsvBQy7wGZs9KIioV354jU91393TJqGoKto6t_PvuJuUEI6ICqYd0H7VzN-Tixw9EDlrEZ6A99JV7lfIy9ombQaNP6CHiaw95C76_xsPYj8zvE0Fm5-AJcoUu_l65WOk7BR-oGKl2a9rjU-k0y8OBjBJE1hQ31z7pfwoeXsMBRgoGZI4D_QnsC_6QUHaL7Mx1344rB7rL17Fs_8_WxN1-Po.kAVeGWlW15mpBvifD1cTqg">
  



      
    
  

    

    
      
      
      
      
      
      
      
      
        
      
    

    <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:70px">
      <div class="a-fixed-right-grid-col a-col-left" style="padding-right:5%;float:left;">
        <div class="a-row">
          <span class="a-text-bold">
            Password:
          </span>
        </div>
        
          <div class="a-row">
            ********
          </div>
        
        

        

        
      </div>

      
        <div class="a-fixed-right-grid-col a-col-right" style="width:70px;margin-right:-70px;float:left;">
          <div class="a-row">
            <span class="a-button a-button-span12 a-button-base" id="a-autoid-4"><span class="a-button-inner"><input id="auth-cnep-edit-password-button" class="a-button-input" type="submit" aria-labelledby="a-autoid-4-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-4-announce">
              Edit
            </span></span></span>
          </div>
          
        </div>
      
    </div></div>
  </form>
</div>



        </span></li>
      
      
    

    
    

    
    

    
    
    
    

    
      
      <li><span class="a-list-item">
        
        















<div class="a-section a-padding-medium">
  <form method="get" action="https://www.amazon.com/a/settings/approval">

  
    
    
      <input type="hidden" name="appActionToken" value="gA8xH8oaRDbdcJPWH0tGbNiAGmMj3D"><input type="hidden" name="appAction" value="">

      




  
    <input type="hidden" name="openid.return_to" value="ape:aHR0cHM6Ly93d3cuYW1hem9uLmNvbS95b3VyLWFjY291bnQ=">
  
    <input type="hidden" name="prevRID" value="ape:QVhXWjgyNU1CUEs1OTJOMUo5VFQ=">
  
    <input type="hidden" name="email" value="ape:c2hpdmFuZ2kubmFncGFsQHNqc3UuZWR1">
  
    <input type="hidden" name="workflowState" value="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.ovyQEDaFwsnOYLwjmzQxMtXPa9hxjn7BEE6OQjniwbaGfT7jZVm93g.sA6p5nlrHniAQhAM.2XfikDYHkqmp8WNIAtwqc-AilvpK_H8eInKFkwDgNspG1uvVkLdEOb3dilglhGk0p3qugD1xEh2z8Ov_qvf3nSu2lRW7ICzlHSeoNjjZLby4rx0XvAM_XnfmDNOJwhHw7X0bLClKkUxxWx5Pw5GDSVaPvajn5RsKeZuHSlaqj1w65DrH1qa8SuLJtCTs67ppbTrawxFVcNFIG4rmsHbCW1C7PhvObUHLNQm_TK5Xxgh78eNMdBhhZJpiygtyLbNYn2p6uX9yuuYOuoZ2BDla3PBH4UEo41XYF5fe5sksAlkXn-CiOuBNORwoUfkTUOsrKFOjEWTZMb2sx1AyQQBOi17vHZ0DGRogj_Hkht1BZe5lIEUIdpFMPyKhNX6PgZLPh6kRQeyJTyEu5ZaDegBurz5Jt_4Gda4yuVYNQYD95Z5JJqsvBQy7wGZs9KIioV354jU91393TJqGoKto6t_PvuJuUEI6ICqYd0H7VzN-Tixw9EDlrEZ6A99JV7lfIy9ombQaNP6CHiaw95C76_xsPYj8zvE0Fm5-AJcoUu_l65WOk7BR-oGKl2a9rjU-k0y8OBjBJE1hQ31z7pfwoeXsMBRgoGZI4D_QnsC_6QUHaL7Mx1344rB7rL17Fs_8_WxN1-Po.kAVeGWlW15mpBvifD1cTqg">
  



      
        <input type="hidden" name="referringAppAction" value="CNEP">
      
    
  

    

    
      
      
      
      
      
      
      
      
        
      
    

    <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:70px">
      <div class="a-fixed-right-grid-col a-col-left" style="padding-right:5%;float:left;">
        <div class="a-row">
          <span class="a-text-bold">
            Two-Step Verification (2SV) Settings:
          </span>
        </div>
        
        
          <div class="a-row">
            <span class="a-color-secondary">
              Manage your Two Step Verification (2SV) Authenticators
            </span>
          </div>
        

        

        
      </div>

      
        <div class="a-fixed-right-grid-col a-col-right" style="width:70px;margin-right:-70px;float:left;">
          <div class="a-row">
            <span class="a-button a-button-span12 a-button-base" id="a-autoid-5"><span class="a-button-inner"><input id="auth-cnep-advanced-security-settings-button" class="a-button-input" type="submit" aria-labelledby="a-autoid-5-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-5-announce">
              Edit
            </span></span></span>
          </div>
          
        </div>
      
    </div></div>
  </form>
</div>

      </span></li>
    
  </ul></div></div>

  <div class="a-section a-spacing-top-base a-padding-small">
    <div class="a-row">
      <div class="a-column a-span12 a-span-last">
        <span class="a-button a-button-primary" id="a-autoid-6"><span class="a-button-inner"><a id="auth-cnep-done-button" href="https://www.amazon.com/your-account" class="a-button-text" role="button">
          Done
        </a></span></span>
      </div>
    </div>
  </div>
</div>

</div> */}


