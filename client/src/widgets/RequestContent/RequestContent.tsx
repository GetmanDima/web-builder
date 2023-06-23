import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useAppDispatch } from "@app";
import {
  ApiRequestAction,
  ApiRequest,
  editRequest,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { ListItem } from "@shared/ui";
import { RequestParamModal } from "./RequestParamModal";
import { RequestResponseModal } from "./RequestResponseModal";

interface RequestContentProps {
  request: ApiRequest;
}

export const RequestContent = ({ request }: RequestContentProps) => {
  const dispatch = useAppDispatch();

  const [paramVisible, setParamVisible] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);

  const saveRequest = (newRequest: ApiRequest) => {
    dispatch(editRequest(newRequest));
  };

  const onDeleteClick = (action: ApiRequestAction) => {
    dispatch(
      editRequest({
        ...request,
        actions: request.actions.filter((a) => a.id !== action.id),
      })
    );
  };

  const itemComponents = request.actions.map((action) => {
    return (
      <ListItem className='w-[600px] mb-[10px]' key={action.id}>
        <div className='flex'>
          <div className='mr-[20px] text-[16px]'>{action.var}</div>
          <div className='text-[16px]'>{action.type}</div>
        </div>
        <div className='ml-auto flex items-center'>
          <SettingsIcon
            onClick={() => dispatch(setCurrRequestAction(action))}
            className='cursor-pointer mr-[5px]'
          />
          <DeleteOutlineIcon
            onClick={() => onDeleteClick(action)}
            className='cursor-pointer'
          />
        </div>
      </ListItem>
    );
  });

  return (
    <>
      <div>
        <ListItem className='w-[600px] mb-[10px]'>
          <div className='cursor-pointer text-[16px]'>
            {request.params.length} параметров
          </div>
          <SettingsIcon
            onClick={() => setParamVisible(true)}
            className='cursor-pointer ml-auto'
          />
        </ListItem>
        {itemComponents}
        <ListItem className='w-[600px] mb-[10px]'>
          <div className='flex'>
            <div className='mr-[20px] text-[16px]'>
              {request.response.status}
            </div>
            <div className='text-[16px]'>
              {JSON.stringify(request.response.vars)}
            </div>
          </div>
          <SettingsIcon
            onClick={() => setResponseVisible(true)}
            className='cursor-pointer ml-auto'
          />
        </ListItem>
      </div>
      <RequestParamModal
        request={request}
        saveRequest={saveRequest}
        visible={paramVisible}
        closeModal={() => setParamVisible(false)}
      />
      <RequestResponseModal
        request={request}
        saveRequest={saveRequest}
        visible={responseVisible}
        closeModal={() => setResponseVisible(false)}
      />
    </>
  );
};
