import missionModel from "@/resources/missions/mission.model";
import mission from "@/resources/missions/mission.interface";

class missionService {
  private mission = missionModel;

  public async create(
    title: string,
    state: string,
    mover_id: string,
  ): Promise<mission> {
    try {
      const createMission = await this.mission.create({
        title,
        state,
        mover_id,
      });
      return createMission;
    } catch (e) {
      throw new Error("Unable to add mission");
    }
  }
}

export default missionService;
