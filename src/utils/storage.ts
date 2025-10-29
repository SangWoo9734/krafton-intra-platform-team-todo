export function getItem<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch {
    throw new Error(`localStorage 조회에 실패했습니다.`);
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error(`localStorage 저장에 실패했습니다.`);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    throw new Error(`localStorage 삭제에 실패했습니다.`);
  }
}

export function clear(): void {
  try {
    localStorage.clear();
  } catch {
    throw new Error(`localStorage 초기화에 실패했습니다.`);
  }
}
