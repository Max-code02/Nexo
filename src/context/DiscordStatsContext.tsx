import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { COMMUNITY_INFO } from '../data/communityData';

export interface DiscordLiveData {
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  memberCount: number;
  onlineCount: number;
  serverName: string;
  serverIconUrl: string | null;
  serverDescription: string | null;
  inviteCode: string;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
  updateInviteCode: (newCode: string) => Promise<boolean>;
}

const DiscordStatsContext = createContext<DiscordLiveData>({
  isLive: false,
  isLoading: false,
  error: null,
  memberCount: COMMUNITY_INFO.stats.members,
  onlineCount: COMMUNITY_INFO.stats.onlineMembers,
  serverName: COMMUNITY_INFO.name,
  serverIconUrl: null,
  serverDescription: COMMUNITY_INFO.description,
  inviteCode: COMMUNITY_INFO.discordInviteCode,
  refetch: async () => {},
  updateInviteCode: async () => false,
  lastUpdated: null,
});

export const DiscordStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inviteCode, setInviteCode] = useState<string>(() => {
    const saved = localStorage.getItem('nexo_discord_invite_code');
    if (!saved || saved === 'MRCC6XSVWG' || saved === 'mrcc6xsvwg') {
      return COMMUNITY_INFO.discordInviteCode;
    }
    return saved;
  });
  const [memberCount, setMemberCount] = useState<number>(COMMUNITY_INFO.stats.members);
  const [onlineCount, setOnlineCount] = useState<number>(COMMUNITY_INFO.stats.onlineMembers);
  const [serverName, setServerName] = useState<string>(COMMUNITY_INFO.name);
  const [serverIconUrl, setServerIconUrl] = useState<string | null>(null);
  const [serverDescription, setServerDescription] = useState<string | null>(COMMUNITY_INFO.description);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const cleanCode = (input: string): string => {
    let code = input.trim();
    if (code.includes('discord.gg/')) {
      code = code.split('discord.gg/')[1]?.split('/')[0]?.split('?')[0] || code;
    } else if (code.includes('discord.com/invite/')) {
      code = code.split('discord.com/invite/')[1]?.split('/')[0]?.split('?')[0] || code;
    }
    return code;
  };

  const fetchInviteData = useCallback(async (codeToFetch: string): Promise<boolean> => {
    const code = cleanCode(codeToFetch);
    if (!code) return false;

    setIsLoading(true);
    setError(null);

    try {
      // Direct Discord public invite endpoint with counts
      const res = await fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true&with_expiration=true`);
      
      if (!res.ok) {
        // Might be invalid or rate limited
        const errData = await res.json().catch(() => ({}));
        if (res.status === 404 || errData.code === 10006) {
          setError(`Einladung "${code}" wurde von Discord nicht gefunden (Code 10006).`);
        } else if (res.status === 429) {
          setError('Discord API Rate-Limit erreicht. Bitte in wenigen Momenten erneut versuchen.');
        } else {
          setError(`Discord API Status: ${res.status}`);
        }
        setIsLive(false);
        return false;
      }

      const data = await res.json();

      if (data && data.approximate_member_count !== undefined) {
        setMemberCount(data.approximate_member_count);
        setOnlineCount(data.approximate_presence_count || Math.round(data.approximate_member_count * 0.25));
        
        if (data.guild) {
          if (data.guild.name) setServerName(data.guild.name);
          if (data.guild.description) setServerDescription(data.guild.description);
          if (data.guild.id && data.guild.icon) {
            const iconExt = data.guild.icon.startsWith('a_') ? 'gif' : 'png';
            setServerIconUrl(`https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.${iconExt}?size=128`);
          }
        }

        setIsLive(true);
        setError(null);
        setLastUpdated(new Date());
        return true;
      }

      setIsLive(false);
      return false;
    } catch (err: any) {
      console.warn('Discord Live fetch warning:', err);
      setError(err?.message || 'Netzwerkfehler beim Abrufen der Discord Daten');
      setIsLive(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchInviteData(inviteCode);
  }, [fetchInviteData, inviteCode]);

  const updateInviteCode = useCallback(async (newCodeInput: string): Promise<boolean> => {
    const cleaned = cleanCode(newCodeInput);
    if (!cleaned) return false;
    
    setInviteCode(cleaned);
    localStorage.setItem('nexo_discord_invite_code', cleaned);
    return await fetchInviteData(cleaned);
  }, [fetchInviteData]);

  // Initial fetch and periodic background refresh every 2 minutes
  useEffect(() => {
    fetchInviteData(inviteCode);

    const interval = setInterval(() => {
      fetchInviteData(inviteCode);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [fetchInviteData, inviteCode]);

  return (
    <DiscordStatsContext.Provider
      value={{
        isLive,
        isLoading,
        error,
        memberCount,
        onlineCount,
        serverName,
        serverIconUrl,
        serverDescription,
        inviteCode,
        lastUpdated,
        refetch,
        updateInviteCode,
      }}
    >
      {children}
    </DiscordStatsContext.Provider>
  );
};

export const useDiscordStats = () => useContext(DiscordStatsContext);
