import React from "react"
import {
    EuiIcon,
    EuiHeader,
    EuiHeaderSection,
    EuiHeaderSectionItem,
    EuiHeaderSectionItemButton,
    EuiHeaderLinks,
    EuiHeaderLink,
    EuiAvatar,
} from "@elastic/eui"
import loginIcon from "../../assets/img/loginIcon.svg"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const LogoSection = styled(EuiHeaderLink)`
  padding: 0 2rem;
`

function Navbar({ user, ...props }) {
    return (
        <EuiHeader style={props.style || {}}>
            <EuiHeaderSection>
                <EuiHeaderSectionItem border="right">
                    <LogoSection href="/">
                        <EuiIcon type="cloudDrizzle" color="#1E90FF" size="l" /> Phresh
                    </LogoSection>

                </EuiHeaderSectionItem>
                <EuiHeaderSectionItem border="right">
                    <EuiHeaderLinks aria-label="app navigation links">
                        <EuiHeaderLink iconType="tear" href="#">
                            Find Cleaners
                        </EuiHeaderLink>
                        <EuiHeaderLink iconType="tag" href="#">
                            Find Jobs
                        </EuiHeaderLink>
                        <EuiHeaderLink iconType="help" href="#">
                            Help
                        </EuiHeaderLink>
                    </EuiHeaderLinks>
                </EuiHeaderSectionItem>
            </EuiHeaderSection>
            <EuiHeaderSection>
                <EuiHeaderSectionItemButton aria-label="User avatar">
                    {user?.profile ? (
                        <EuiAvatar size="l" name={user.profile.full_name} imageUrl={user.profile.image} />
                    ) : (
                        <Link to="/login">
                            <EuiAvatar size="l" color="#1E90FF" name="user" imageUrl={loginIcon} />
                        </Link>
                    )}
                </EuiHeaderSectionItemButton>
            </EuiHeaderSection>
        </EuiHeader>
    )
}

export default connect((state) => ({ user: state.auth.user }))(Navbar) 