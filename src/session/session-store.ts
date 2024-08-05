import {
  getSessionId,
  getSessionIdAndCreateIfMissing,
} from "@/session/session-id";
import { redis } from "@/lib/redis";

export function get(key: string, namespace: string = "") {
  const sessionId = getSessionId();
  if (!sessionId) {
    return null;
  }
  return redis.hget(`session-${namespace}-${sessionId}`, key);
}

export function getAll(namespace: string = "") {
  const sessionId = getSessionId();
  if (!sessionId) {
    return null;
  }
  return redis.hgetall(`session-${namespace}-${sessionId}`);
}

export function set(key: string, value: string, namespace: string = "") {
  const sessionId = getSessionIdAndCreateIfMissing();
  return redis.hset(`session-${namespace}-${sessionId}`, { [key]: value });
}
