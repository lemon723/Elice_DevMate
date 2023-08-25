import mongoose from 'mongoose';
import Group from '../models/Group';
import User from '../models/User';
import { SortCriteria } from '../types/groups-types';

class GroupsService {
  async findAllGroup(
    page: number,
    perPage: number,
    type: string | undefined,
    location: string | undefined,
    position: string[] | undefined,
    skill: string[] | undefined,
    sortByTime: boolean | undefined,
  ) {
    const sortCriteria: SortCriteria = {};
    sortByTime ? (sortCriteria.createdAt = -1) : (sortCriteria.viewCount = -1);

    const groups = await Group.find(
      position || location || skill || type
        ? {
            $and: [
              position ? { position: { $in: position } } : {},
              location ? { location: location } : {},
              skill ? { skills: { $in: skill } } : {},
              type ? { type: type } : {},
              { status: '모집중' },
            ],
          }
        : {
            status: '모집중',
          },
    )
      .sort(sortByTime ? { createdAt: -1 } : { viewCount: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const data = await Group.find(
      position || location || skill || type
        ? {
            $and: [
              position ? { position: { $in: position } } : {},
              location ? { location: location } : {},
              skill ? { skills: { $in: skill } } : {},
              type ? { type: type } : {},
              { status: '모집중' },
            ],
          }
        : {
            status: '모집중',
          },
    );

    const total = data.length;
    const totalPage = Math.ceil(total / perPage);

    return { groups, totalPage };
  }

  async findHotGroup() {
    const hotGroup = await Group.find().sort({ viewCount: -1 }).limit(4);
    return hotGroup;
  }

  async findOneGroup(groupId: string) {
    const group = await Group.findById(groupId)
      .populate('author', 'nickName')
      .populate('currentMembers', 'nickName');
    return group;
  }

  async createGroup(userId: string, groupData: object) {
    const newGroup = new Group(groupData);
    const createdGroup = newGroup.save();

    await User.findByIdAndUpdate(
      userId,
      { createdGroup: (await createdGroup)._id },
      { new: true },
    );
    return;
  }

  async oqweqweGroup() {
    return {};
  }
}

export default GroupsService;