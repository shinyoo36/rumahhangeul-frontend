export function userLocal() {
    const localUserData = localStorage.getItem('userData');
    let userData;
    
    if (localUserData !== null) {
        userData = JSON.parse(localUserData);
        return userData;
    } else{
      return null;
    }
}
  
export const fetchUserData = async () => {
    const userData = userLocal();
    if(userData){
      const userId = userData.id;
      try {
        const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/user/profile/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("userData", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error occurred while fetching user:", error);
      }
    }
};

export const getUserCourse = async () => {
  const userData = userLocal();
  if(userData){
  const userId = userData.id;
    try {
      const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/users/profile/${userId}/courses`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error occurred while fetching user course:", error);
      
    }
  } else {
    return null;
  }

};

export const getUserCourseByCourseId = async (courseId) => {
  const userData = userLocal();
  const userId = userData.id;

  try {
    const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/users/profile/${userId}/courses`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      if (courseId) {
        // Find the first course object with the matching courseId
        return data.find(course => course.id === courseId);
      } else {
        return data;
      }
    }
  } catch (error) {
    console.error("Error occurred while fetching user course:", error);
    return null;
  }
};

export const getUserItem = async () => {
  const userData = userLocal();
  if(userData){
  const userId = userData.id;
    try {
      const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/users/profile/${userId}/items`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error occurred while fetching user item:", error);
      
    }
  } else {
    return null;
  }

};

export const getUserChallenge = async () => {
  const userData = userLocal();
  if(userData){
  const userId = userData.id;
    try {
      const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/users/profile/${userId}/challenges`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error occurred while fetching user course:", error);
      
    }
  } else {
    return null;
  }

};

