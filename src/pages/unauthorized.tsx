import React from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducers";
import { LayoutType } from '../utils/enums';

type UnauthorizedProps = {
    page: React.ReactElement
    layout?: LayoutType
}
export const Unauthorized: React.FC<UnauthorizedProps> = ({
    page,
}) => {
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.userInfo);

    const [pageContent, setPageContent] = React.useState<React.ReactElement>(<></>);
    React.useEffect(() => {
        if (userInfo.token) {
            console.log("Unauthorized: Redirect to home page");
            navigate("/");
        } else {
            setPageContent(page)
        }
    }, [page, userInfo, navigate]);

    return <>{pageContent}</>
}