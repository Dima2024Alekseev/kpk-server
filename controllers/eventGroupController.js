// controllers/eventGroupController.js
import Event from "../models/Event.js";
import Group from "../models/Group.js";

export const getEventGroups = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: 'students',
        populate: {
          path: 'group',
          model: 'Group'
        }
      })
      .populate({
        path: 'teachers',
        populate: {
          path: 'department',
          model: 'Department'
        }
      });

    // Группируем студентов по группам для каждого мероприятия
    const eventsWithGroups = events.map(event => {
      const groupsMap = new Map();
      
      // Обрабатываем студентов
      event.students.forEach(student => {
        if (student.group) {
          const groupId = student.group._id.toString();
          if (!groupsMap.has(groupId)) {
            groupsMap.set(groupId, {
              group: student.group,
              students: [],
              teachers: []
            });
          }
          groupsMap.get(groupId).students.push(student);
        }
      });

      // Обрабатываем преподавателей (если нужно)
      event.teachers.forEach(teacher => {
        // Можно добавить логику для преподавателей, если нужно
      });

      return {
        ...event.toObject(),
        groups: Array.from(groupsMap.values())
      };
    });

    res.status(200).json(eventsWithGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};