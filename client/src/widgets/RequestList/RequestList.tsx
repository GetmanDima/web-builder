import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { ListItem } from "@shared/ui";
import { ApiRequest, removeRequest, setCurrRequestName } from "@entities/Api/model/apiReducer";

export const RequestList = () => {
  const dispatch = useAppDispatch();
  const { requests } = useSelector((state: RootState) => state.api);

  const selectRequest = (request: ApiRequest) => {
    dispatch(setCurrRequestName(request.name))
  }

  const onDeleteClick = (request: ApiRequest) => {
    dispatch(removeRequest(request.name));
  };

  const itemComponents = requests.map((request) => {
    return (
      <>
        <ListItem className='w-[456px] mb-[10px]' key={request.name}>
          <div
            className='cursor-pointer mr-[20px] text-[16px]'
            onClick={() => selectRequest(request)}
          >
            {request.name}
          </div>
          <div className='ml-auto flex items-center'>
            <SettingsIcon
              onClick={() => selectRequest(request)}
              className='cursor-pointer mr-[5px]'
            />
            <DeleteOutlineIcon
              onClick={() => onDeleteClick(request)}
              className='cursor-pointer'
            />
          </div>
        </ListItem>
      </>
    );
  });

  return <div>{itemComponents}</div>;
};
