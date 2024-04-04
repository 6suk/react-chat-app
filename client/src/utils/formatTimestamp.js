const formatTimestamp = timestamp => {
  const today = new Date();
  const targetDate = new Date(timestamp);

  if (
    today.getDate() === targetDate.getDate() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getFullYear() === targetDate.getFullYear()
  ) {
    const formattedTime = targetDate.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return formattedTime;
  } else {
    const formattedDateTime = targetDate.toLocaleString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return formattedDateTime;
  }
};

export default formatTimestamp;
