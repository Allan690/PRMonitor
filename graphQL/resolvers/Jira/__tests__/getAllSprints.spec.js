import getAllSprints from "../getAllSprints";
import authorizationHandler from "../../../../helpers/unauthorizedResponse";
import app from "../../../../app";
import {axiosJiraAgileConfig} from "../axiosConfig";

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

authorizationHandler.mockReturnValue(null);

describe('getAllSprints', () => {
    let req;
    let _;
    beforeEach(() => {
        req = Object.create(app);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('gets all sprints', async () => {
        jest.spyOn(axiosJiraAgileConfig, 'request').mockResolvedValueOnce({
            data: {
                maxResults: 40,
                total: 10,
                values: [
                    {
                        "id": 12,
                        "self": "test_url",
                        "state": "closed",
                        "name": "Vehicle allocation sprint",
                        "startDate": "2019-06-11T15:13:00.835Z",
                        "endDate": "2019-06-25T15:13:09.000Z",
                        "completeDate": "2019-06-11T15:38:14.680Z",
                        "originBoardId": 8,
                        "goal": "- Admins should be able to add vendors"
                    },
                ]
            }
        });
        const response = await getAllSprints(_, { boardId: "TEST-123"}, { req });
        expect(response).toEqual(
          {
            maxResults: 40,
            total: 10,
            Sprints: [
              {
                "id": 12,
                "self": "test_url",
                "state": "closed",
                "name": "Vehicle allocation sprint",
                "startDate": "2019-06-11T15:13:00.835Z",
                "endDate": "2019-06-25T15:13:09.000Z",
                "completeDate": "2019-06-11T15:38:14.680Z",
                "originBoardId": 8,
                "goal": "- Admins should be able to add vendors"
              },
            ]
          }
        )
    });

    it('throws errors', async () => {
      jest.spyOn(axiosJiraAgileConfig, 'request').mockResolvedValueOnce(null);
      try {
        await getAllSprints(_, { boardId: "TEST-121"}, { req });
      }
      catch(err) {
        expect(err.message).toEqual('Cannot destructure property `data` of \'undefined\' or' +
          ' \'null\'.');
      }
    });
});
