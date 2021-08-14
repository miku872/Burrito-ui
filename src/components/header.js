import React from "react";
import SelectAPIProviderDropDown from './header/settings/select_api_provider_dropdown'
const Header = (props) => {

  const apiProviderSelected = (apiProvider) => {
    props.setAPIProvider(apiProvider);
  }

  return (
    <div className="app-header">
      <div className = "app-header-logo">
        <h1 > Burrito </h1>
      </div>
      <SelectAPIProviderDropDown  onAPIProviderSelection = {apiProviderSelected}/>
   </div>
 );
}
export default Header
