import { Status } from "models/Status";
import { getStatusTypes } from "types/status/statusFunctionsTypes";
import { parseDateToString } from "utils/parseDateToString";

class StatusRepository {
  async getStatus({
    statusName,
    statusId,
    databaseConnection
  }: getStatusTypes) {
    try {
      let whereProps: any = {}

      if (statusName) whereProps.status = statusName;
      if (statusId) whereProps.id = statusId;

      const status = await databaseConnection.contentStatus.findMany({
        where: whereProps,
      });

      const statusList = status.map((item) => {
        const { id, status, creation_timestamp, record_timestamp } = item;

        const parsedCreationTimestamp = parseDateToString(creation_timestamp);
        const parsedRecordTimestamp = parseDateToString(record_timestamp);

        const statusObject = new Status({
          id,
          status,
          creation_timestamp: parsedCreationTimestamp,
          record_timestamp: parsedRecordTimestamp,
        });

        return statusObject.exportResponse();
      });

      return statusList;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new StatusRepository();