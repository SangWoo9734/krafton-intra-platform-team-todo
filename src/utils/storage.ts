export function getItem<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('localStorage 조회 실패:', error);
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('localStorage 저장 실패:', error);
    throw new Error('localStorage 저장 실패');
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('localStorage 삭제 실패:', error);
    throw new Error('localStorage 삭제 실패');
  }
}

export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('localStorage 초기화 실패:', error);
    throw new Error('localStorage 초기화 실패');
  }
}
