// services/MeetingMinutes.ts
import { title } from 'process';
import { db } from '../db'; // reuse the shared instance
import { eq} from 'drizzle-orm';
import { meetingMinutes } from '../db/schema';

export async function getMeetingMinutesById(id: number) {
  return db.query.meetingMinutes.findFirst({
    where: eq(meetingMinutes.id, id),
  });
}


export async function getMeetingMinutesByProject(projectId: number) {
  return db.query.meetingMinutes.findMany({
    where: eq(meetingMinutes.projectId, projectId),
  });
}

export async function createMeetingMinutes(projectId: number, title: string, file: string) {

  return db.insert(meetingMinutes).values({
    projectId: projectId,
    title: title,
    file: file,
  });
}

export async function updateMeetingMinutes(meetingMinuteId: number, title: string, file: string) {
  return db.update(meetingMinutes).set({
    title: title,
    file: file,
  }).where(eq(meetingMinutes.id, meetingMinuteId));
}

export async function deleteMeetingMinutes(meetingMinuteId: number) {
  return db.delete(meetingMinutes).where(eq(meetingMinutes.id, meetingMinuteId));
} 